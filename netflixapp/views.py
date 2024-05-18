# import imp
# from django.shortcuts import render,redirect
# from django.views import View
# from django.contrib.auth.decorators import login_required
# from django.utils.decorators import method_decorator
# from .forms import ProfileForm
# from .models import Profile ,Contact
# from django.http import HttpResponse, HttpResponseRedirect
# from django.core.mail import send_mail
# from django.urls import reverse

# class Index(View):
#     def get(self,request,*args,**kwargs):
#         if request.user.is_authenticated:
#             return redirect('netflixapp:profile-list')
#         return render(request,'index.html')

# class Popular(View):
#     def get(self, request):
#         return render(request, 'popular.html')
    
# class Tv_show(View):
#     def get(self, request):
#         return render(request, 'tv_show.html')
    

# class Random(View):
#     def get(self, request):
#         return render(request, 'random.html')
    

# class Contact(View):
#     def get(self, request):
#         return render(request, 'contact.html')

#     def post(self, request):
#         name = request.POST.get("name")
#         email = request.POST.get("email")
#         message = request.POST.get("message")
#         contact = Contact.objects.create(name=name, email=email, message=message)
#         context = {'message': f"Dear {name}, Thanks for your message!"}
#         return render(request, 'contact.html', context)
#     # def post(self, request):
#     #     if request.method == 'POST':
#     #         # Process the form data
#     #         name = request.POST.get('name', '')
#     #         email = request.POST.get('email', '')
#     #         message = request.POST.get('message', '')

#     #         # Here you can do something with the form data, such as sending an email
#     #         send_mail(
#     #             'Message from {}'.format(name),
#     #             message,
#     #             email,
#     #             ['recipient@example.com'],
#     #             fail_silently=False,
#     #         )
#     #         return HttpResponseRedirect(reverse('success'))  # Replace 'success' with the name of your success URL pattern
        
#     #     # If request method is not POST, render the form template
#     #     return render(request, 'contact.html')


# class Home(View):
#     def get(self, request):
#         return render(request, 'home.html')



# method_decorator(login_required,name='dispatch')
# class ProfileList(View):
#     def get(self,request,*args,**kwargs):
#         profiles=request.user.profiles.all()
#         context={
#             'profiles':profiles
#         }
#         return render(request,'profile.html',context)
        
# method_decorator(login_required, name='dispatch')
# class ProfileCreate(View):
#     def get(self, request, *args, **kwargs):
#         form = ProfileForm()
#         context = {
#             'form':form
#         }
#         return render(request, 'profilecreate.html', context)

#     def post(self, request, *args, **kwargs):
#         form = ProfileForm(request.POST or None)
#         if form.is_valid():
#             profile = Profile.objects.create(**form.cleaned_data)
#             if profile:
#                 request.user.profiles.add(profile)
#                 return redirect('netflixapp:profile-list')
#         context = {
#             'form':form
#         }
#         return render(request, 'profilecreate.html', context)

# method_decorator(login_required, name='dispatch')
# # Create your views here.




from django.shortcuts import render,redirect
from django.views import View
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from .forms import ProfileForm
from .models import Profile ,Contact


class Index(View):
    def get(self,request,*args,**kwargs):
        if request.user.is_authenticated:
            return redirect('netflixapp:profile-list')
        return render(request,'index.html')
# class contact(View):
#     def get(self,request,args,*kwargs):
#         context={}
#         if request.method=="POST":
#             name = request.POST.get("name")
#             em = request.POST.get("email")
#             msz = request.POST.get("message")
#             obj = Contact(name=name, email=em, message=msz)
#             obj.save()
#             context['message']=f"Dear {name}, Thanks for your time!"
#             return redirect('netflixapp:contact')
#         return render(request,'contact.html', context)
    
class ContactView(View):
    def get(self, request):
        return render(request, 'contact.html')

    def post(self, request):
        name = request.POST.get("name")
        email = request.POST.get("email")
        message = request.POST.get("message")
        contact = Contact.objects.create(name=name, email=email, message=message)
        context = {'message': f"Dear {name}, Thanks for your message!"}
        return render(request, 'contact.html', context)
class Home(View):
    def get(self, request):
        return render(request, 'home.html')
class Popular(View):
    def get(self, request):
        return render(request, 'popular.html')
    
class Tv_show(View):
    def get(self, request):
        return render(request, 'tv_show.html')

class Video(View):
    def get(self, request):
        # context = {'title': title}
        return render(request, 'video.html')
    

class Random(View):
    def get(self, request):
        return render(request, 'random.html')
    


method_decorator(login_required,name='dispatch')
class ProfileList(View):
    def get(self,request,*args,**kwargs):
        profiles=request.user.profiles.all()
        context={
            'profiles':profiles
        }
        return render(request,'profile.html',context)
        
method_decorator(login_required, name='dispatch')
class ProfileCreate(View):
    def get(self, request, *args, **kwargs):
        form = ProfileForm()
        context = {
            'form':form
        }
        return render(request, 'profilecreate.html', context)

    def post(self, request, *args, **kwargs):
        form = ProfileForm(request.POST or None)
        if form.is_valid():
            profile = Profile.objects.create(**form.cleaned_data)
            if profile:
                request.user.profiles.add(profile)
                return redirect('netflixapp:profile-list')
        context = {
            'form':form
        }
        return render(request, 'profilecreate.html', context)

method_decorator(login_required, name='dispatch')
# Create your views here.