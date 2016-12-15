$LOAD_PATH.unshift File.expand_path("../../lib", __FILE__)

require "express_validations"
require 'support/database'
require 'support/with_model'

RSpec.configure do |config|
  config.mock_with :rspec
end
