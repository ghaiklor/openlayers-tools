function Layer() {
    return this;
}

Layer.prototype = {
    addMap: function (maps) {
        for (var map in maps) {
            //TODO: realize writing to Console from other sub-objects
//            this.Console.writeDebug(map);
        }
    }
};