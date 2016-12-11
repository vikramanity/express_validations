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

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    spec.metadata['allowed_push_host'] = "TODO: Set to 'http://mygemserver.com'"
  else
    raise "RubyGems 2.0 or newer is required to protect against " \
      "public gem pushes."
  end

  spec.files         = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|spec|features)/})
  end
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.13"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rspec", "~> 3.0"
end
