from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView, ListAPIView, UpdateAPIView, RetrieveUpdateAPIView, RetrieveUpdateDestroyAPIView
from .serializer import ProfileSerializer, ContactSerializer
from .models import Profile, Contact
from rest_framework.response import Response
from rest_framework.decorators import APIView, api_view
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.status import *
from rest_framework.pagination import PageNumberPagination



class SignUp(APIView) :
    serializer_class = ProfileSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = Profile.objects.all()
        serializer = ProfileSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None, *args, **kwargs):
        print(request.data)
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_200_OK)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)
        

class GetUser(RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


@api_view(['GET'])
def get_user(request, username):
    user = Profile.objects.get(username=username)
    serializer = ProfileSerializer(user)
    return Response(serializer.data)


class Users(ListAPIView) :
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class UpdateUser(RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer



@api_view(['GET', 'PUT'])
def update_user(request, id):
    user = Profile.objects.get(id=id)
    ser = ProfileSerializer(user, many=False)
    if request.method == "PUT":

        # username = request.data['username']
        # password = request.data['password']
        # phone_number = request.data['phone_number']
        # image = request.FILES['image']
        # division = request.data['division']

        user = ProfileSerializer(data=request.data)
        if user.is_valid():
            user.save()
            return Response("Updated")

    return Response(ser.data)


class RetrieveContact(ListAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    pagination_class = PageNumberPagination


class CreateContact(APIView):
    serializer_classes = ContactSerializer
    parser_classes = (MultiPartParser, FormParser)


    def get(self, request, *args, **kwargs):
        contacts = Contact.objects.all()
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        
        print(request.data)
        serializer = ContactSerializer(data=request.data)
    
        
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=HTTP_200_OK)
        
        else:
            return Response(status=HTTP_400_BAD_REQUEST)
    

class UpdateDeleteContact(RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    parser_classes = [MultiPartParser, FormParser]
    

    

