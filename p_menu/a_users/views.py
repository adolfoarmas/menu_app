from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages



from a_api.serializers import serializers
from a_api import models

# Create your views here.

def register(request):
    """
    Fuction to register new users in the Users db model 

    Args:
        request (HttpRequest object): HTTP request from client (browser)

    Returns:
        HttpResponse: 
    """
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save() #Saving form user data in the model
            username = form.cleaned_data.get('username')
            message_to_show = f'User {username} created sucessfully!'
            messages.success(request, message_to_show.format(username))
    else:
        form = UserCreationForm()
    return render(request, 'users/register.html', { 'form':form })

