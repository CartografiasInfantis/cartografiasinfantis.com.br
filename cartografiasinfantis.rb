module CartografiasInfantis
  class App < Sinatra::Base
    set :public, File.dirname(__FILE__) + '/public'
  end
end
