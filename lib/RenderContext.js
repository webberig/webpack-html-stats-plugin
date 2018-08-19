module.exports = class RenderContext {

    constructor (compiler) {
        const stats = compiler.getStats().toJson();
        this.chunks = stats.chunks;

        this.modules = stats.modules;
        this.indexedModules = {};
        this.modules.forEach(module => {
            module.dependencies = [];
            this.indexedModules[module.id] = module;
        });
        this.modules.forEach(module => {
            module.dependencies = [];
            this.indexedModules[module.id] = module;
        });
        this.modules.forEach(module => {
            module.reasons.forEach(reason => {
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
