var reportsWidget = {
    options: {
        containerSelector: '.reports',
        template: (
            '{{#.}}' +
                '<article class="reports_item">' +
                    '<a href="{{cover}}" target="_blank">' +
                        '<img class="reports_cover" src="{{cover}}" alt="{{title}} Cover"/>' +
                    '</a>' +
                    '<footer class="reports_docs">' +
                        '{{#documents}}' +
                            '<h3 class="reports_title">' +
                                '<a href="{{url}}" target="_blank">{{title}}</a>' +
                            '</h3>' +
                        '{{/documents}}' +
                    '</footer>' +
                '</article>' +
            '{{/.}}'
        ),
        current_page: 1,
        obj_per_page: 9,
    },
    page: 0,

    init: function() {
        this.renderReports(reportData.slice(0, 9) || []);
    },

    renderReports: function(reports) {
        var inst = this,
            options = inst.options;

        $(options.containerSelector).html(Mustache.render(options.template, reports));
    },

    next: function(nextArrays) {
        reportsWidget.page = nextArrays <= 9 ? nextArrays + 9 : nextArrays;
        console.log('aaa', reportData.slice(reportsWidget.page - 9, reportsWidget.page));
        if(reportData.slice(reportsWidget.page - 9, reportsWidget.page) && reportData.slice(reportsWidget.page - 9, reportsWidget.page).length > 0){
            reportsWidget.renderReports(reportData.slice(reportsWidget.page - 9, reportsWidget.page));
        } else {
            reportsWidget.page = 0;
            this.renderReports(reportData.slice(0, 9) || []);
        }
        
    },

    previous: function(nextArrays) {
        reportsWidget.page = nextArrays;
        if(reportsWidget.page <= 0){
            reportsWidget.page = 9;
            return;
        }
        console.log('aaa', reportData.slice(reportsWidget.page - 9, reportsWidget.page));
        if(reportData.slice(reportsWidget.page - 9, reportsWidget.page) && reportData.slice(reportsWidget.page - 9, reportsWidget.page).length > 0){
            reportsWidget.renderReports(reportData.slice(reportsWidget.page - 9, reportsWidget.page));
        } else {
            return;
        }
        
    }
};

reportsWidget.init();