// ---------------------------------------------------------------------------
// Express Validations - (https://github.com/vikramanity/express_validations)
// Copyright (c) 2016 Vikram Anand
// Licensed under MIT (https://opensource.org/licenses/MIT)
// ---------------------------------------------------------------------------


(function() {
  var displayValidation, getValidationsFor, railsValidations, validateField;

  // A list of all (most) Rails validations
  // railsValidations = [
  //   "absence",
  //   "acceptance",
  //   "confirmation",
  //   "exclusion",
  //   "format",
  //   "inclusion",
  //   "length",
  //   "numericality",
  //   "presence",
  //   "uniqueness"
  // ];

  getValidationsFor = function($element, validationRules) {
    var elName, fieldName, validationObjects;
    elName = $element.attr('name');
    fieldName = elName.substring(elName.indexOf("[") + 1, elName.indexOf("]"));
    validationObjects = [];
    $.each(validationRules, function(i1, validationRule) {
      var validators;
      if (fieldName === Object.keys(validationRule)[0]) {
        validators = validationRule[fieldName].validators;
        return $.each(validators, function(i2, validator) {
          var opts, valdor;
          valdor = Object.keys(validator)[0];
          opts = validator[Object.keys(validator)[0]];
          return validationObjects.push({
            validator: valdor,
            options: opts
          });
        });
      }
    });
    return validationObjects;
  };

  displayValidation = function($element, message) {
    // code to display validation error message
  };

  validateField = function($element, fieldValidation, exceptions) {
    var $el, flag, labelText, options, regex, regexString, tMsg, validationPassed, validator;
    if (exceptions == null) {
      exceptions = [];
    }
    validationPassed = true;
    validator = fieldValidation.validator;
    options = fieldValidation.options;
    if ((validator === "AbsenceValidator") && ($.inArray(validator, exceptions) === -1)) {
      if (($element.val() != null) && ($element.val() != "")) {
        validationPassed = false;
        labelText = $("label[for='" + $element.attr('id') + "']").first().text();
        tMsg = labelText + ' ' + options.message;
        displayValidation($element, tMsg);
      }
    } else if ((validator === "AcceptanceValidator") && ($.inArray(validator, exceptions) === -1)) {
      if ($element.val().not(':checked')) {
        validationPassed = false;
        labelText = $("label[for='" + $element.attr('id') + "']").first().text();
        tMsg = labelText + ' ' + options.message;
        displayValidation($element, tMsg);
      }
    } else if ((validator === "ConfirmationValidator") && ($.inArray(validator, exceptions) === -1)) {
      $el = $('input#' + $element.attr('id') + '_confirmation').first();
      if ($element.val() !== $el.val()) {
        validationPassed = false;
        displayValidation($el, options.message);
      }
    } else if ((validator === "ExclusionValidator") && ($.inArray(validator, exceptions) === -1)) {
      if ($.inArray($element.val(), options["in"]) > -1) {
        validationPassed = false;
        labelText = $("label[for='" + $element.attr('id') + "']").first().text();
        tMsg = labelText + ' ' + options.message;
        displayValidation($element, tMsg);
      }
    } else if ((validator === "FormatValidator") && ($.inArray(validator, exceptions) === -1)) {
      // convert Ruby regex to Javascript
      var flag, rReg, regex, regexString;
      rReg = options.with;
      regexString = "^" + rReg.substring(rReg.indexOf('A') + 1, rReg.lastIndexOf('z') - 1) + "$";
      flag = /i/i.test(rReg.substring(1, rReg.indexOf('A'))) ? "i" : "";
      flag += /m/i.test(rReg.substring(1, rReg.indexOf('A'))) ? "m" : "";
      flag += /g/i.test(rReg.substring(1, rReg.indexOf('A'))) ? "g" : "";
      regex = new RegExp(regexString, flag);
      if (!regex.test($element.val())) {
        validationPassed = false;
        labelText = $("label[for='" + $element.attr('id') + "']").first().text();
        tMsg = labelText + ' ' + options.message;
        displayValidation($element, tMsg);
      }
    } else if ((validator === "InclusionValidator") && ($.inArray(validator, exceptions) === -1)) {
      if ($.inArray($element.val(), options["in"]) < 0) {
        validationPassed = false;
        labelText = $("label[for='" + $element.attr('id') + "']").first().text();
        tMsg = labelText + ' ' + options.message;
        displayValidation($element, tMsg);
      }
    } else if ((validator === "LengthValidator") && ($.inArray(validator, exceptions) === -1)) {
      if ($element.val().length < options.minimum) {
        validationPassed = false;
        labelText = $("label[for='" + $element.attr('id') + "']").first().text();
        tMsg = labelText + ' ' + (options.too_short || options.message);
        displayValidation($element, tMsg);
      }
      if ($element.val().length > options.maximum) {
        validationPassed = false;
        labelText = $("label[for='" + $element.attr('id') + "']").first().text();
        tMsg = labelText + ' ' + (options.too_long || options.message);
        displayValidation($element, tMsg);
      }
    } else if ((validator === "PresenceValidator") && ($.inArray(validator, exceptions) === -1)) {
      if ($element.val() === "") {
        validationPassed = false;
        labelText = $("label[for='" + $element.attr('id') + "']").first().text();
        tMsg = labelText + ' ' + options.message;
        displayValidation($element, tMsg);
      }
    }
    return validationPassed;
  };


  this.expressValidations = {
    checkFieldValidation: function($validationField, validationRules, exceptions) {
      var validationPassed, validationResult, fieldValidations;
      if (exceptions == null) {
        exceptions = [];
      }
      validationPassed = true;
      validationResult = [];
      fieldValidations = getValidationsFor($validationField, validationRules);
      $.each(fieldValidations, function(i1, fieldValidation) {
        var result;
        result = validateField($validationField, fieldValidation, exceptions);
        validationResult.push(result);
        if (!result) {
          return false;
        }
      });
      if ($.inArray(false, validationResult) > -1) {
        validationPassed = false;
      }
      return validationPassed;
    },
    checkFormValidation: function($form, validationRules, exceptions) {
      var validationFields = $form.find(':input:not(:hidden):not(:button):not(:submit)');
      var validationPassed, validationResult;
      if (exceptions == null) {
        exceptions = [];
      }
      validationPassed = true;
      validationResult = [];
      $.each(validationFields, function(i1, $validationField) {
        var fieldValidations;
        fieldValidations = getValidationsFor($validationField, validationRules);
        return $.each(fieldValidations, function(i2, fieldValidation) {
          var result;
          result = validateField($validationField, fieldValidation, exceptions);
          validationResult.push(result);
          if (!result) {
            return false;
          }
        });
      });
      if ($.inArray(false, validationResult) > -1) {
        validationPassed = false;
      }
      return validationPassed;
    },
    getValidationsFor: function($element, validationRules) {
      var elName, fieldName, validationObjects;
      elName = $element.attr('name');
      fieldName = elName.substring(elName.indexOf("[") + 1, elName.indexOf("]"));
      validationObjects = [];
      $.each(validationRules, function(i1, validationRule) {
        var validators;
        if (fieldName === Object.keys(validationRule)[0]) {
          validators = validationRule[fieldName].validators;
          return $.each(validators, function(i2, validator) {
            var opts, valdor;
            valdor = Object.keys(validator)[0];
            opts = validator[Object.keys(validator)[0]];
            return validationObjects.push({
              validator: valdor,
              options: opts
            });
          });
        }
      });
      return validationObjects;
    },
    getValidationsForMultiple: function(validationFields, validationRules) {
      var fieldValidations = [];
      $.each(validationFields, function(i1, $validationField) {
        var key = $validationField;
        var val = getValidationsFor($validationField, validationRules);
        fieldValidations.push({
          field: key,
          validations: val
        });
      });
      return fieldValidations;
    },
    checkUniqueness: function($element, uniquenessResults) {
      $.ajax({
        url: "determine_uniqueness",
        type: "get",
        data: {
          field: $element.attr('name'),
          value: $element.val()
        },
        dataType: "json",
        success: function(data) {
          return uniquenessResults.push([$element, data.uniqueness]);
        },
        error: function(j, s, e) {
          return window.networkError = true;
        }
      });
      return uniquenessResults;
    },
    checkAge: function(age, validationFields, msg) {
      var $element1, $element2, $element3, ageDate, givenDate, validationPassed;
      validationPassed = true;
      ageDate = new Date();
      ageDate.setFullYear(ageDate.getUTCFullYear() - age);
      ageDate.setMonth(ageDate.getUTCMonth());
      ageDate.setDate(ageDate.getUTCDate());
      $element1 = validationFields[0];
      $element2 = validationFields[1];
      $element3 = validationFields[2];
      givenDate = new Date($element1.val(), $element2.val(), $element3.val());
      if (ageDate.getTime() <= givenDate.getTime()) {
        validationPassed = false;
        displayValidation($element3, msg);
      }
      return validationPassed;
    }
  };
}).call(this);
