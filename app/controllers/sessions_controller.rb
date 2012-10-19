class SessionsController < ApplicationController
  def new
    omniauth = env['omniauth.auth']
    puts "-"*20
    puts omniauth.to_hash.to_yaml
    puts "*"*20

    session[:account_id] = raise 'weeeeee'

    redirect_to home_url # or a graph api call
  end

  def destroy
    reset_session
    redirect_to root_url
  end


  def failure
    flash[:error] = params[:message]
  end
end
