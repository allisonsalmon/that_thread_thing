class ApplicationController < ActionController::Base
  protect_from_forgery

  def set_ravelry_token access_token
    $ravelry_access_token = access_token
  end

  def ravelry_token
    $ravelry_access_token
  end
end
