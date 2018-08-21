module.exports = class RenderContext {
    constructor (compiler) {
        const stats = compiler.toJson({
            source: false,
            modulesSort: '!size',
            chunksSort: '!size',
        });
        console.log(stats.time);
        Object.assign(this, stats);

        this.indexedModules = {};
        this.modules.forEach((module) => {
            this.indexedModules[module.id] = module;
            this.indexedModules[module.id].dependencies = [];
        });
        this.indexedChunks = {};
        this.chunks.forEach((chunk) => {
            this.indexedChunks[chunk.id] = chunk;
        });

        this.modules.forEach((module) => {
            module.reasons.forEach((reason) => {
                if (reason.moduleId && this.indexedModules[reason.moduleId]) {
                    this.indexedModules[reason.moduleId].dependencies.push(module.id);
                }
            });
        });
    }

    getAssetChunks(asset) {
        return asset.chunks.map(chunkId => this.indexedChunks[chunkId]);
    }

    getModuleDependencies (id) {
        return this.indexedModules[id].dependencies.map(moduleId => this.indexedModules[moduleId]);
    }

    getModuleReasons (id) {
        return this.indexedModules[id].reasons.map(reason => this.indexedModules[reason.moduleId]);
    }
};
