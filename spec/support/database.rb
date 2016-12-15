require 'yaml'

module Support
  def self.connect_to_db
    begin
      ## A yml file with details of database configurations. Should be git ignored.
      config = YAML.load_file('spec/support/secrets.yml')

      db_adapter = config["database"]["adapter"]
      db_host = config["database"]["host"]
      db_port = config["database"]["port"]
      db_user = config["database"]["username"]
      db_password = config["database"]["password"]

      ActiveRecord::Base.establish_connection(:adapter  => db_adapter,
                                              :database => 'express_validations_test',
                                              :host => db_host,
                                              :port => db_port,
                                              :username => db_user,
                                              :password => db_password,
                                              :min_messages => 'warning')
      connection = ActiveRecord::Base.connection
      # connection.create_database 'express_validations_test', :encoding => 'unicode'
    rescue => e
      at_exit do
        puts "~" * 60
        puts "Unable to connect to database!"
        puts e.message
        puts "~" * 60
      end
    end
  end
end
