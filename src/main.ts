export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-animator-css')
        .plugin('utils/index');
    aurelia.start().then(a => a.setRoot());
}
