require 'rubygems'
require 'sinatra'
require 'haml'
require 'pusher'
require 'json'

Pusher.app_id = '1350'
Pusher.key = '2f26b8b3ea8bbda5ec02'
Pusher.secret = '6d6063afe5941083e5da'

CHANNEL = 'demo_chat'

set :haml, {:format => :html5 }

def push(msg, data = {})
  Pusher[CHANNEL].trigger(msg, data)
end

get '/' do
  haml :chat
end

post '/' do
  content_type :json
  push('message_posted', params[:message])
  {:status => :ok}.to_json
end