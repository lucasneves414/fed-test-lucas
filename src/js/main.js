//I have created a new template (`templateTwo`) to be the pagination template. 
//The variable called `oldNumber` i only use to activate and deactivate the `.active` class that simply change the colors of the pagination number(1,2,3)

//Gave up of this for now: The variavle called `page` is the current 'page'. Is to be used in the arrow components of the pagination
var reportsWidget = {
    options: {
        containerSelector: '.reports',
        containerSelectorPagination: '.paginationNumbers',
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
        templateTwo: (
            '{{#.}}' +
            '<a href="#" id="{{number}}" onclick="reportsWidget.change({{number}})">{{number}}</a>' +
            '{{/.}}'
        ),
        oldNumber: 1,
    },
    // page: 0,

    init: function() {
        this.renderReports(reportData.slice(0, 9) || []);
        this.renderPagination();
    },

    renderReports: function(reports) {
        var inst = this,
            options = inst.options;

        $(options.containerSelector).html(Mustache.render(options.template, reports));
        
    },

    //Used to render the pagination
    renderPagination: function() {
        var inst = this,
            options = inst.options;
            
        //I use this logic to create an array of objects to show the exact number of 'pages'(1,2,3) that should be in the pagination
        let reportsPagination = []
        let numberPagination = Math.ceil(reportData.length / 9);

        for (let i = 0; i < numberPagination; i++) {
            reportsPagination.push({number: i + 1})
          };

        $(options.containerSelectorPagination).html(Mustache.render(options.templateTwo, reportsPagination));

        //Logic to activate the class .active in the pagination numbers (1,2,3)
        var element = document.getElementById(options.oldNumber);
        element.classList.add("active");
    },

    //`onclick` used to change the current page. Is used at the pagination `.paginationNumbers` on the `templateTwo` (1,2,3)
    change: function(number) {
        var inst = this,
            options = inst.options;

        //I use this logic to devide the original arrays into arrays of 9 or less [1[...9], [2[...9], 3[...4]]
        //That's important to match the array of objects (`reportsPagination`) that shows the exact number of 'pages'(1,2,3).
        //Is used like this: reportDataSplited[reportsPagination[1].number];
        let size = 9; 
        var reportDataSplited = [];
        for (let i = 0; i < reportData.length; i += size) {
            reportDataSplited.push(reportData.slice(i, i + size));
        }
        
    //Logic to activate and deactivate the class `.active`
        var elementOldNumber = document.getElementById(options.oldNumber);
        elementOldNumber.classList.remove("active");
        var element = document.getElementById(number);
        element.classList.add("active");
        options.oldNumber = number;
        reportsWidget.renderReports(reportDataSplited[number - 1]);
    },

    //Gave up of this for now:
    // //`onclick` used in the arrow components. Is made to go for the next page
    // next: function(nextArrays) {
    //     var inst = this,
    //         options = inst.options;

    //     reportsWidget.page = nextArrays <= 9 ? nextArrays + 9 : nextArrays;
        
    //     //This `if` checks if there is a next page available
    //     if(reportData.slice(reportsWidget.page - 9, reportsWidget.page) && reportData.slice(reportsWidget.page - 9, reportsWidget.page).length > 0){
    //         reportsWidget.renderReports(reportData.slice(reportsWidget.page - 9, reportsWidget.page));

    //         //Logic to activate and deactivate the class .active
    //         var elementOldNumber = document.getElementById(options.oldNumber);
    //         elementOldNumber.classList.remove("active");
    //         var element = document.getElementById(options.oldNumber + 1);
    //         element.classList.add("active");
    //         options.oldNumber = options.oldNumber + 1;
    //     } else {
    //         reportsWidget.page = 0;
    //         this.renderReports(reportData.slice(0, 9) || []);

    //         //Logic to activate and deactivate the class .active
    //         var elementOldNumber = document.getElementById(options.oldNumber);
    //         options.oldNumber = 1;
    //         elementOldNumber.classList.remove("active");
    //         var element = document.getElementById(options.oldNumber);
    //         element.classList.add("active");
    //         options.oldNumber = options.oldNumber;
    //     }
    // },

    // //onclick used in the arrow components. Is made to go for the previous page
    // previous: function(nextArrays) {
    //     var inst = this,
    //         options = inst.options;
    //     reportsWidget.page = nextArrays;
    //     if(reportsWidget.page <= 0){
    //         reportsWidget.page = 9;
    //         return;
    //     }
        
    //     //This `if` checks if there is a previous page available
    //     if(reportData.slice(reportsWidget.page - 9, reportsWidget.page) && reportData.slice(reportsWidget.page - 9, reportsWidget.page).length > 0){
    //         reportsWidget.renderReports(reportData.slice(reportsWidget.page - 9, reportsWidget.page));

    //         //Logic to activate and deactivate the class .active
    //         var elementOldNumber = document.getElementById(options.oldNumber);
    //         elementOldNumber.classList.remove("active");
    //         var element = document.getElementById(options.oldNumber - 1);
    //         element.classList.add("active");
    //         options.oldNumber = options.oldNumber - 1;
    //     } else {
    //         return;
    //     }
        
    // }
};

reportsWidget.init();