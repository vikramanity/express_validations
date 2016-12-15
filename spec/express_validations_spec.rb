require "spec_helper"
require "json"

describe ExpressValidations do
  it "has a version number" do
    expect(ExpressValidations::VERSION).not_to be nil
  end
end

describe "an Active Record model which includes ExpressValidations" do
  before { Support.connect_to_db }

  with_model :ModelWithExpressValidations do
    table do |t|
      t.string 'title'
      t.text 'content'
      t.string 'website'
    end

    model do
      attr_accessor :password
      attr_accessor :password_confirmation

      validates_presence_of :title, :content, :website, :password,
                            :message => 'cannot be blank'

      validates_length_of :title,
                          :within => 2..50,
                          :too_short => "requires to be minimum of 2 in length",
                          :too_long => "is too long"

      validates_length_of :content,
                          :within => 2..2000,
                          :too_short => "requires to be minimum of 2 in length",
                          :too_long => "is too long"

      validates_format_of :website,
                          :with => /\A[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}\z/,
                          :message => "invalid format"

      validates_length_of :password,
                          :within => 6..16,
                          :too_short => "requires to be minimum of 6 in length",
                          :too_long => "is too long"

      validates_confirmation_of :password,
                                :message => "Does not match"

      validates_presence_of :password_confirmation,
                            :message => 'cannot be blank',
                            :unless => lambda{ |obj| obj.password.blank? }

      include ExpressValidations
      # validations_as_json [:password, :password_confirmation]
    end
  end

  it "has a class method called validations_as_json" do
    expect(ModelWithExpressValidations).to respond_to(:validations_as_json)
  end

  describe ".validations_as_json" do
    it "accepts a single argument" do
      expect(ModelWithExpressValidations).to respond_to(:validations_as_json).with(1).argument
      # expect(ModelWithExpressValidations).to respond_to(:validations_as_json) do |arg|
      #   puts "Arg -- " + arg
      #   arg.should be_an_instance_of(String)
      # end
    end

    context "when no argument is passed in" do
      it "responds with a string" do
        expect(ModelWithExpressValidations.validations_as_json)
        .to be_instance_of(String)
      end

      it "responds with a JSON string containing model attributes and their validations" do
        arr_of_hashes = JSON.parse ModelWithExpressValidations.validations_as_json
        arr_of_hashes.each do |_hash|
          expect(ModelWithExpressValidations.attribute_names).to include(_hash.keys.first)
          expect(_hash.values.first.keys.first).to eq("validators")
        end
      end
    end

    context "when a valid argument array is passed in" do
      it "responds with a string" do
        expect(ModelWithExpressValidations.validations_as_json([]))
        .to be_instance_of(String)
      end

      it "responds with a JSON string containing attributes passed, plus model attributes and their validations" do
        arr_of_hashes = JSON.parse ModelWithExpressValidations.validations_as_json([:password, :password_confirmation])
        arr_of_hashes.each do |_hash|
          expect(["password", "password_confirmation"] + ModelWithExpressValidations.attribute_names)
          .to include(_hash.keys.first)
          expect(_hash.values.first.keys.first).to eq("validators")
        end
      end
    end

    context "when an invalid argument is passed in" do
      it "raises an exception when invoked" do
        expect {
          ModelWithExpressValidations.validations_as_json(nil)
        }.to raise_error(ArgumentError, "Argument must be an array!")
      end
    end
  end
end
