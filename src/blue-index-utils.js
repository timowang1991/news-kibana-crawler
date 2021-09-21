const { providerBlueIndices } = require('./configs');

const getBlueIndexByDisplayName = (name) => {
    const matchProviderName = Object.keys(providerBlueIndices)
        .find((provider) => name.indexOf(provider) >= 0);

    if (!matchProviderName) {
        return 3;
    }

    return providerBlueIndices[matchProviderName];
};

module.exports = { getBlueIndexByDisplayName };
