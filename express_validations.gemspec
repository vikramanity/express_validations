# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'express_validations/version'

Gem::Specification.new do |spec|
  spec.name          = "express_validations"
  spec.version       = ExpressValidations::VERSION
  spec.authors       = ["Vikram Anand"]
  spec.email         = ["vikram983@outlook.com"]

  spec.summary       = %q{Express the validations in your models as JSON objects.}
  spec.description   = %q{This gem allows you to express the validations in your models as JSON objects, so that you can implement them as client side validations.}
  spec.homepage      = "https://github.com/vikramanity/express_validations"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|spec|features)/})
  end
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.required_ruby_version = '>= 1.9.3'
  spec.add_development_dependency "bundler", "~> 1.13"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rspec", "~> 3.0"
  spec.add_development_dependency 'pg', '0.17.1'
  spec.add_development_dependency 'with_model', '~> 1.2'
  spec.add_dependency 'activesupport', '>= 3.2.22', '<= 5.0.0.1'
  spec.add_dependency 'railties', '>= 3.2.22', '<= 5.0.0.1'
end
