# ExpressValidations

This gem allows you to express the validations in your Rails models as JSON objects, so that you can implement them as client side validations with JQuery --- the way you want to.

This gem helps to maintain consistency between validation rules on server-side and implementations on client-side.

It can be very handy if you want to display validations in a more user-friendly manner or when you are creating a wizard and want to implement model validations on each step.

## Installation

Add this line to your Rails application's Gemfile:

```ruby
gem 'express_validations'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install express_validations

## Usage

For model classes where you require the validations on client-side, add the following line to it:

```include ExpressValidations```

Then in the views for this model do:

```
<%= javascript_tag do %>
	window.validationRules = <%= #{Your Model}.validations_as_json.html_safe %>;
<% end %>
```

This will give access of the model's validation definitions to your application's client-side.

But that is not it. You can use the JQuery functions provided with this gem to check if validation passes on a particular field or form, as well as get validation details for a field or a set of fields.

Include the following line in your ```application.js``` file:

```//= require express.validations```

Then you can use the included functions, for examples, as:

```
// returns true or false
var fieldValidation = expressValidations.checkFieldValidation($('input#user_first_name'), window.validationRules);

// returns true or false
var formValidation = expressValidations.checkFieldValidation($('form#new_user'), window.validationRules);

// returns an object
var fieldValidationRules = expressValidations.getValidationsFor($('input#user_first_name'), window.validationRules);

// returns an array of objects
var multipleFieldsValidationRules = expressValidations.getValidationsForMultiple([$('input#username'), $('input#password')], window.validationRules);

```

## Notes

- It requires ```Ruby >= 1.9.3```
- It requires ```activesupport >= 3.2.22```
- It requires that you declare validations with the form ```validates_#{validation_name}_of``` such as ```validates_presence_of```, with specified options and messages
- It skips on ```numericality``` validator
- It cannot take custom validations into account


## ToDo

- Add more JS examples
- Add the ```numericality``` validator
- Add tests for Javascript functions

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/vikramanity/express_validations.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
