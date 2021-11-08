const getListIdUrl = (listId) => `https://graviton-ncp-content-gateway.media.yahoo.com/api/v2/gql/stream_view?namespace=abu&id=editorial-list&version=v1&adsEnabled=false&count=30&device=smartphone&feedName=main&imageFormat=DEFAULT&imageSizes=100x100&lang=zh-Hant-TW&listAlias=&pageContext=%7B%7D&queryProfile=assetlist_single_feed&region=TW&site=news&snippetCount=10&spaceId=1197809816&listId=${listId}`;

const urls = {
    newsIndexPage: [
        {
            position: 0,
            positionCol: 1,
            positionName: 'hero',
            url: getListIdUrl('52f13c10-6d85-11e9-b2ed-db716e4c9882'),
        },
        {
            position: 1,
            positionCol: 1,
            positionName: 'categoryWrapper',
            url: getListIdUrl('5b465a55-e5f3-4f6b-9865-7206bbab35a0'),
        },
        {
            position: 1,
            positionCol: 1,
            positionName: 'categoryWrapper',
            url: getListIdUrl('16a4b400-efb5-433a-aa0d-dd3ee1bc675d'),
        },
        {
            position: 1,
            positionCol: 2,
            positionName: 'abuBreakingNews', // 新聞快報
            url: getListIdUrl('66cd89c7-979b-4c0f-b27d-0a495174b5e7'),
        },
        {
            position: 2,
            positionCol: 1,
            positionName: 'categoryWrapper',
            url: getListIdUrl('37ba1814-9727-4b31-96a2-c4497c8e0317'),
        },
        {
            position: 2,
            positionCol: 1,
            positionName: 'categoryWrapper',
            url: getListIdUrl('6522a5f2-5076-4242-9287-9fa7274d5156'),
        },
        {
            position: 3,
            positionCol: 1,
            positionName: 'categoryWrapper',
            url: getListIdUrl('9d45273b-da83-4f2a-aa8b-10c2af8ce082'),
        },
        {
            position: 3,
            positionCol: 1,
            positionName: 'categoryWrapper',
            url: getListIdUrl('c6bc6719-185d-4851-8ec8-0ed01fe8d6e8'),
        },
        {
            position: 4,
            positionCol: 1,
            positionName: 'categoryWrapper',
            url: getListIdUrl('f85e28f7-f6b4-427f-8356-986cec67d12f'),
        },
        {
            position: 4,
            positionCol: 1,
            positionName: 'categoryWrapper',
            url: getListIdUrl('dc4f0209-2407-4ede-ba8d-7789555a559e'),
        },
        {
            position: 5,
            positionCol: 1,
            positionName: 'categoryWrapper',
            url: getListIdUrl('b7550b3b-c7df-4bf5-84df-4045aeef57a0'),
        },
        {
            position: 5,
            positionCol: 1,
            positionName: 'categoryWrapper',
            url: getListIdUrl('c912f3da-5c9b-48f9-a243-e8dd94faf65c'),
        },
        {
            position: 6,
            positionCol: 1,
            positionName: 'categoryWrapper',
            url: getListIdUrl('d7e2156b-1ca2-483f-ad4f-246bd032076b'),
        },
        {
            position: 6,
            positionCol: 1,
            positionName: 'categoryWrapper',
            url: getListIdUrl('2841db01-3672-462e-aaff-160f2b5ddaf1'),
        },
        {
            position: 6,
            positionCol: 2,
            positionName: 'mostPopular', // 最多人瀏覽
            jsonPath: 'data.main.stream',
            url: 'https://graviton-ncp-content-gateway.media.yahoo.com/api/v2/gql/stream_view?namespace=abu&id=main-stream&version=v1&adsEnabled=false&count=170&device=desktop&imageFormat=DEFAULT&lang=zh-Hant-TW&logoImgType=lightlogo&pageContext=%7B%7D&queryProfile=main_single_feed&region=TW&site=news&snippetCount=10',
        },
        {
            position: 7,
            positionCol: 1,
            positionName: 'newsColection', // 各家新聞
            url: getListIdUrl('cff206bf-9612-4903-9863-a9ad12319b12'),
        },
        {
            position: 7,
            positionCol: 2,
            positionName: 'magazine', // 雜誌專區
            url: getListIdUrl('b11aeba6-28c8-47bd-b0d8-96b89a20d817'),
        },
    ],
};

const providerBlueIndices = {
    三立: 1,
    民視: 1,
    新頭殼: 1,
    壹電視: 1,

    非凡: 2,

    中央社: 3,
    Yahoo: 3,
    自立: 3,
    華視: 3,
    台視: 3,
    BBC: 3,
    // Temp 3
    NOW: 3,
    東森: 3,
    鏡週刊: 3,
    信傳媒: 3,

    TVBS: 4,
    聯合: 4,

    CTWANT: 5,
    中時: 5,
    中廣: 5,
    旺報: 5,
    中天: 5,
};

const configs = {
    urls,
    index: 'yahoo-news',
    providerBlueIndices,
};

module.exports = configs;
