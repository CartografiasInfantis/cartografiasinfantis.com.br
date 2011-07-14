module CartografiasInfantis
  class App < Sinatra::Base
    set :public, File.dirname(__FILE__) + '/public'
    set :views , File.dirname(__FILE__) + '/templates'

    get '/' do
      erb :index
    end
  end
end
