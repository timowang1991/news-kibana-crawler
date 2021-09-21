const { Client } = require('@elastic/elasticsearch');
const axios = require('axios');
const get = require('lodash.get');
const { CronJob } = require('cron');

const configs = require('./configs');
const { getBlueIndexByDisplayName } = require('./blue-index-utils');

const {
    ELASTIC_SEARCH_ENDPOINT,
} = process.env;

console.log('ELASTIC_SEARCH_ENDPOINT', ELASTIC_SEARCH_ENDPOINT);

const client = new Client({
    node: ELASTIC_SEARCH_ENDPOINT,
});

async function run() {
    console.log('crawling process begin');

    const crawlPromises = configs.urls.newsIndexPage.map(async (newsModule) => {
        try {
            console.log('start crawling', newsModule);
            const res = await axios.get(newsModule.url);
            if (res.status !== 200) {
                console.error(`newsModule ${newsModule} not status 200, reason ${res.data}`);
                return {};
            }
            console.log('crawl success', newsModule);
            return Promise.resolve({
                ...newsModule,
                data: get(res.data, newsModule.jsonPath || 'data.blendedStream.stream'),
            });
        } catch (error) {
            console.error(`newsModule ${newsModule} error ${error}`);
            return {};
        }
    });

    const crawlResults = await Promise.all(crawlPromises);

    const indexPromises = crawlResults
        .filter((stream) => stream.data)
        .map(async (stream) => stream.data.map(async (streamItem) => {
            console.log('stream', stream, 'streamItem', streamItem);
            const { body } = await client.search({
                index: configs.index,
                body: {
                    query: {
                        match: { id: streamItem.id },
                    },
                },
            }).catch((err) => {
                console.error('client.search stream', stream, 'streamItem', streamItem, 'error', err);
                return {};
            });
            if (body && Array.isArray(body.hits.hits) && body.hits.hits.length > 0) {
                console.log('streamItem id already exists, skip, id: ', streamItem.id);
                return {};
            }
            return client.index({
                index: configs.index,
                body: {
                    metaForKb: {
                        position: stream.position,
                        positionCol: stream.positionCol,
                        positionName: stream.positionName,
                        displayTime: new Date().toISOString(),
                        blueIndex:
                            getBlueIndexByDisplayName(streamItem.content.provider.displayName),
                    },
                    ...streamItem,
                },
            }).catch((err) => {
                console.error(`client.index stream ${stream} streamItem ${streamItem} error ${err}`);
                return {};
            });
        })).flat();

    await Promise.all(indexPromises);

    await client.indices.refresh({ index: configs.index });

    console.log('crawling process end');
}

const job = new CronJob('0 */5 * * * *', run, null, true, 'Asia/Taipei');
job.start();
