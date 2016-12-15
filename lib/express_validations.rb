require "active_support/concern"

require "express_validations/version"

module ExpressValidations
  require "express_validations/engine" if defined? Rails

  extend ActiveSupport::Concern

  module ClassMethods
    def validations_as_json(attributes = [])
      raise ArgumentError, "Argument must be an array!" unless attributes.is_a?(Array)

      validatons = []
      attrs_with_validations = attributes

      attribute_names.map{ |attr|
        attrs_with_validations << attr.to_sym unless validators_on(attr).blank?
      }

      attrs_with_validations.each do |attr|
        validators = []
        attr_validators = validators_on(attr)

        attr_validators.each do |attr_validator|
          validators << { attr_validator.class.name.demodulize.to_sym => attr_validator.options }
        end

        validatons << { attr => { :validators => validators } }
      end

      validatons.to_json
    end
  end
end
