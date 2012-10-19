ThatThreadThing::Application.routes.draw do

  get    '/threads/graph' => 'threads#graph'
  get    '/auth/:provider/callback' => 'sessions#new'
  delete '/logout' => 'sessions#destroy'

  root to: 'welcome#anonymous'
end
