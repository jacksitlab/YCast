
class RadioStation {
    constructor(name, url) {
        this.name = name;
        this._url = url;
    }
}
class RadioStationCategory {

    constructor(name, obj) {
        this._name = name;
        this._stations = [];
        if (obj != undefined) {
            Object.keys(obj).forEach(k => {
                this._stations.push(new RadioStation(k, obj[k]));
            });
        }
    }
    hasStations() {
        return this._stations, length > 0;
    }
}
class YCastInfos {

    constructor(obj) {
        this.categories = [];
        if (obj != undefined) {
            Object.keys(obj).forEach(k => {
                this.categories.push(new RadioStationCategory(k, obj[k]));
            });
        }
    }
}
class App {

    constructor(id) {
        this._id = id;
        this.infos = undefined;
        this.init().then(() => {
            this.render();
        })
    }


    init() {
        const promise = new Promise((resolve, reject) => {
            const url = window.origin + '/admin/stations';
            console.log("url=" + url)
            fetch(url).then((response) => {
                response.json().then(json => {
                    this.infos = new YCastInfos(json);
                    console.log(this.infos);
                    resolve();
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            }).catch((error) => {
                console.error(error);
                reject(error);
            });
        });
        return promise;
    }
    render() {
        const toplist = document.createElement('ul');
        if (this.infos != undefined) {
            let i = 0;
            this.infos.categories.forEach(cat => {
                const li = document.createElement('li');
                let j = 0;
                li.innerHTML = cat._name;
                if (cat.hasStations()) {
                    cat._stations.forEach(station => {

                    })
                }
                toplist.appendChild(li)
            });
        }
        document.getElementById(this._id).appendChild(toplist);
    }
}

var app;
document.addEventListener("DOMContentLoaded", (event) => {
    app = new App("app");
});
