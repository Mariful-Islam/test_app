from rest_framework import serializers
from .models import Profile, Contact


class ProfileSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Profile
        fields = ['username', 'password', 'phone_number', 'image', 'division']
        extra_kwargs = {'password' : {'write_only' : True}}

    def create(self, validated_data) :
        profile = Profile(username=validated_data['username'],
                          phone_number=validated_data['phone_number'],
                          image=validated_data['image'],
                          division=validated_data['division']
                          )
        profile.set_password(raw_password=validated_data['password'])
        profile.save()

        return profile




class ContactSerializer(serializers.ModelSerializer):
    class Meta :
        model = Contact
        fields = "__all__"


   