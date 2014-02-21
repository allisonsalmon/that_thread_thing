class ThreadsController < ApplicationController
  before_filter :login_required

  def login_required
    if session[:account_id].nil?
      redirect_to '/auth/ravelry'
    end
  end

  def graph
  end

  def project_info
    all_projects = MultiJson.load(ravelry_token.get('https://api.ravelry.com/projects/' + session[:username] + '/list.json').body)
    @projects = all_projects["projects"].flatten
    puts @projects.inspect
  end

  def project_data
    all_projects = MultiJson.load(ravelry_token.get('https://api.ravelry.com/projects/' + session[:username] + '/list.json').body)
    project_array = all_projects["projects"].flatten
    puts project_array.count
    render :json => all_projects  #MultiJson.decode(ravelry_token.get('https://api.ravelry.com/projects/' + session[:username] + '/list.json').body) 
 
  end
end
