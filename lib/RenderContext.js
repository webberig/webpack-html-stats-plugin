module.exports = class RenderContext {
    constructor (compiler) {
        const stats = compiler.getStats().toJson({
            source: false,
            modulesSort: '!size',
            chunksSort: '!size',
        });
        Object.assign(this, stats);

        this.indexedModules = {};
        this.modules.forEach((module) => {
            this.indexedModules[module.id] = module;
            this.indexedModules[module.id].dependencies = [];
        });

        this.modules.forEach((module) => {
            module.reasons.forEach((reason) => {
                if (reason.moduleId && this.indexedModules[reason.moduleId]) {
                    this.indexedModules[reason.moduleId].dependencies.push(module.id);
                }
            });
        });
    }

    getModuleDependencies (id) {
        return this.indexedModules[id].dependencies.map(moduleId => this.indexedModules[moduleId]);
    }

    getModuleReasons (id) {
        return this.indexedModules[id].reasons.map(reason => this.indexedModules[reason.moduleId]);
    }
};
