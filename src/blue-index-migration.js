const { Client } = require('@elastic/elasticsearch');
const { index, providerBlueIndices } = require('./configs');

const {
    ELASTIC_SEARCH_ENDPOINT = 'http://host.docker.internal:9200',
} = process.env;

const client = new Client({
    node: ELASTIC_SEARCH_ENDPOINT,
});

async function migration() {
    const promises = Object.keys(providerBlueIndices).map((providerName) => {
        const blueIndex = providerBlueIndices[providerName];

        return client.updateByQuery({
            index,
            body: {
                query: {
                    match_phrase: { 'content.provider.displayName': providerName },
                },
                script: {
                    source: `ctx._source.metaForKb["blueIndex"] = ${blueIndex}`,
                },
            },
        }).catch((err) => {
            const errMsg = `migrate error: ${err}, providerName: ${providerName}, should have blueIndex ${blueIndex}`;
            console.error(errMsg);
            return errMsg;
        });
    });

    const results = await Promise.all(promises);

    console.log(results);

    console.log('migration complete');
}

migration();
