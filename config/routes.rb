ThatThreadThing::Application.routes.draw do
  get "welcome/anonymous"

  get    '/threads/graph' => 'threads#graph'
  get    '/threads/test'
  get    '/threads/project_data' => 'threads#project_data'
  get    '/threads/project_info' => 'threads#project_info'
  get    '/auth/:provider/callback' => 'sessions#new'
  match '/logout' => 'sessions#destroy'

  root :to => 'welcome#anonymous'
end
