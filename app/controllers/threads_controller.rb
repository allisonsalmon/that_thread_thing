class ThreadsController < ApplicationController
  before_filter :login_required

  def login_required
    if session[:account_id].nil?
      redirect_to '/auth/ravelry'
    end
  end

  def graph
    render text: 'hi'
  end
end
