/**
 * Display a string date from a Date object
 */
window.ko.bindingHandlers.textDate = {
    update: function(element, valueAccessor) {
        var date = ko.unwrap(valueAccessor());
        var strDate = date.toString();
        
        strDate = strDate.substr(strDate.indexOf(" "), 255);
        strDate = strDate.substr(0, strDate.indexOf(date.getFullYear()));
        strDate+= '<small>' + date.getFullYear() + '</small>';
        
        element.innerHTML = strDate;
    }
};
