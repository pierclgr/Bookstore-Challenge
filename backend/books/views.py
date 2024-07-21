from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
from django_filters import NumberFilter
from .models import Book
from .serializers import BookSerializer

class BookFilter(FilterSet):
    min_year = NumberFilter(field_name="publication_year", lookup_expr='gte')
    max_year = NumberFilter(field_name="publication_year", lookup_expr='lte')
    min_price = NumberFilter(field_name="price", lookup_expr='gte')
    max_price = NumberFilter(field_name="price", lookup_expr='lte')

    class Meta:
        model = Book
        fields = ['title', 'author', 'min_year', 'max_year', 'min_price', 'max_price']

class BookListCreate(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = BookFilter
    search_fields = ['title', 'author']
    ordering_fields = ['title', 'author', 'publication_year', 'price']
    ordering = ['title']

class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer