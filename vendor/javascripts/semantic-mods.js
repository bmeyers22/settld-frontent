var newValidationRules = {
    validPassword: function(value, hiddenField) {
        var
        $form = $(this),
            booleanValue;
        if ($form.find('#' + hiddenField).size() > 0) {
            booleanValue = $form.find('#' + hiddenField).val();
        } else if ($form.find('[name=' + hiddenField + ']').size() > 0) {
            booleanValue = $form.find('[name=' + hiddenField + ']').val();
        } else if ($form.find('[data-validate="' + hiddenField + '"]').size() > 0) {
            booleanValue = $form.find('[data-validate="' + hiddenField + '"]').val();
        }
        return (booleanValue !== undefined) ? booleanValue : false;
    },
    number: function(value) {
        return !isNaN(parseFloat(value));
    },
    gt: function(value, min) {
        return isNaN(parseFloat(value)) ? false : value > parseFloat(min);
    },
    lt: function(value, max) {
        return isNaN(parseFloat(value)) ? false : value < parseFloat(max);
    }
}

$.extend($.fn.form.settings.rules, newValidationRules);