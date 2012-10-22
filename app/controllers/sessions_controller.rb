class SessionsController < ApplicationController
  def new
    omniauth = env['omniauth.auth']
    puts "-"*20
    puts omniauth.to_hash.to_yaml
    puts "*"*20

    session[:account_id] = params[:oauth_token]
    session[:username] = params[:username]
    
    set_ravelry_token(omniauth.extra.access_token)

    redirect_to '/threads/graph' 
  end

  def destroy
    reset_session
    redirect_to root_url
  end


  def failure
    flash[:error] = params[:message]
  end
end
