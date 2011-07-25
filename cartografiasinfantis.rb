module CartografiasInfantis
  class App < Sinatra::Base
    set :public, File.dirname(__FILE__) + '/public'
    set :views , File.dirname(__FILE__) + '/templates'

    get '/' do
      erb :index
    end

    get '/css/:name.css' do
      content_type 'text/css', :charset => 'utf-8'
      scss :"css/#{params[:name]}"
    end
  end
end
