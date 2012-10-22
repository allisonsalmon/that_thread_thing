class ThreadsController < ApplicationController
  before_filter :login_required

  def login_required
    if session[:account_id].nil?
      redirect_to '/auth/ravelry'
    end
  end

  def graph
  end

  def project_data
    render :json => MultiJson.decode(ravelry_token.get('https://api.ravelry.com/projects/' + session[:username] + '/list.json').body) 
 
  end
end
