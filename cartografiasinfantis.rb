module CartografiasInfantis
  class App < Sinatra::Base
    set :public, File.dirname(__FILE__) + '/public'
    set :views , File.dirname(__FILE__) + '/templates'

    configure do
      Compass.add_project_configuration(File.join(Sinatra::Application.root, 'config', 'compass_config.rb'))
    end

    get '/' do
      erb :index
    end

    get '/css/:name.css' do
      content_type 'text/css', :charset => 'utf-8'
      scss :"css/#{params[:name]}", Compass.sass_engine_options 
    end
  end
end
