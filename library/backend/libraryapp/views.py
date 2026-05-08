from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404
from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser, FormParser  
from decimal import Decimal, InvalidOperation
from django.contrib.auth.models import User
from django.contrib.auth.hashers import  make_password
from django.contrib.auth.hashers import check_password
from django.db.models import Q
from django.utils import timezone




@api_view(["POST"])
def admin_login_api(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)
    if user is not None and user.is_staff:
        return Response(
            {
                "success": True,
                "message": "Login successful",
                "username": user.username
            },
            status=200
        )

    return Response(
        {
            "success": False,
            "message": "Invalid username or password"
        },
        status=401
    )



@api_view(["POST"])
def add_category(request):
    name = request.data.get("name")
    c_status = request.data.get("status","1")
    is_active=True if str(c_status) == '1' else False
    category=Category.objects.create(name=name,is_active=is_active)
    serializer=CategorySerializer(category)
    return Response(
        {
            "success": True,
            "message": "Category succesfully created",
            "category": serializer.data,
        },
        status=201
    )
   



@api_view(["GET"])
def list_categories(request):
   categories=Category.objects.all().order_by('-id')
   serializer=CategorySerializer(categories,many=True)
   return Response(
       serializer.data, status=status.HTTP_200_OK
       )




@api_view(["PUT"])
def update_category(request,id):
    category=get_object_or_404(Category,id=id)
    name = request.data.get("name")
    c_status = request.data.get("status")
    is_active=True if str(c_status) == '1' else False
    category=Category.objects.create(name=name,is_active=is_active)
    category.name=name
    category.is_active=is_active
    category.save()
    serializer=CategorySerializer(category)
    return Response(
        {
            "success": True,
            "message": "Category succesfully Updated",
            "category": serializer.data,
        },
        status=200
    )

     


@api_view(["DELETE"])
def delete_category(request,id):
    category=get_object_or_404(Category,id=id)
    category.delete()
    return Response(
        {
            "success": True,
            "message": "Category succesfully delete"
        },
        status=200
    )

@api_view(["POST"])
def add_author(request):
    name = request.data.get("name")

    author=Author.objects.create(name=name)
    serializer=AuthorSerializer(author)
    return Response(
        {
            "success": True,
            "message": "Author succesfully created",
            "author": serializer.data,
        },
        status=201
    )

@api_view(["GET"])
def list_authors(request):
   author=Author.objects.all().order_by('-id')
   serializer=AuthorSerializer(author,many=True)
   return Response(
       serializer.data, status=status.HTTP_200_OK
       )

@api_view(["PUT"])
def update_author(request,id):
    author=get_object_or_404(Author,id=id)
    name = request.data.get("name")
    author.name=name
    author.save()
    serializer=AuthorSerializer(author)
    return Response(
        {
            "success": True,
            "message": "Author succesfully Updated",
            "category": serializer.data,
        },
        status=200
    )


@api_view(["DELETE"])
def delete_author(request,id):
    author=get_object_or_404(Author,id=id)
    author.delete()
    return Response(
        {
            "success": True,
            "message": "Author succesfully delete"
        },
        status=200
    )



@api_view(["GET"])
def list_books(request):
   books=Book.objects.all().order_by('-id')
   serializer=BookSerializer(books,many=True)
   return Response(
       serializer.data, status=status.HTTP_200_OK
       )




@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def add_book(request):
    from decimal import Decimal, InvalidOperation

    title = request.data.get("title")
    author_id = request.data.get("author")
    category_id = request.data.get("category")
    isbn = request.data.get("isbn")
    quantity = request.data.get("quantity")
    cover_image = request.FILES.get("cover_image")

    try:
        price = Decimal(request.data.get("price"))
    except (InvalidOperation, TypeError):
        return Response(
            {"success": False, "message": "Invalid price"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if Book.objects.filter(isbn=isbn).exists():
        return Response(
            {"success": False, "message": "ISBN already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    book = Book.objects.create(
        title=title,
        author_id=author_id,
        category_id=category_id,
        isbn=isbn,
        price=price,
        quantity=int(quantity),
        cover_image=cover_image
    )

    serializer = BookSerializer(book)
    return Response({"success": True, "book": serializer.data}, status=201)

    

@api_view(["PUT"])
@parser_classes([MultiPartParser, FormParser])
def update_book(request, id):
    # from decimal import Decimal, InvalidOperation

    # book = get_object_or_404(Book, id=id)

    # book.title = request.data.get("title", book.title)
    # book.author_id = request.data.get("author", book.author_id)
    # book.category_id = request.data.get("category", book.category_id)
    # book.quantity = request.data.get("quantity", book.quantity)

    # price_raw = request.data.get("price")
    # if price_raw:
    #     try:
    #         book.price = Decimal(price_raw)
    #     except InvalidOperation:
    #         return Response(
    #             {"success": False, "message": "Invalid price"},
    #             status=status.HTTP_400_BAD_REQUEST
    #         )

    # if "cover_image" in request.FILES:
    #     book.cover_image = request.FILES["cover_image"]

    # book.save()
    # serializer = BookSerializer(book)
    # return Response({"success": True, "book": serializer.data}, status=200)

    book=get_object_or_404(Book,id=id)

    title = request.data.get("title")
    author_id = request.data.get('author')
    category_id = request.data.get('category')
    price = request.data.get('price')
    quantity = request.data.get('quantity')
    cover_image = request.FILES.get('cover_image')

    author = Author.objects.get(id=author_id)
    category = Category.objects.get(id=category_id)




    book.title=title
    book.author=author
    book.category=category
    book.price=price
    book.quantity=quantity

    if cover_image:         
        book.cover_image=cover_image

    book.save()
    serializer=BookSerializer(book) 
    return Response(
        {
            "success": True,
            "message": "Book succesfully updated",
            "book": serializer.data,
        },
        status=200
    )


@api_view(["DELETE"])
def delete_book(request,id):
    book=get_object_or_404(Book,id=id)
    book.delete()
    
    return Response(
        {
            "success": True,
            "message": "Book succesfully delete"
        },
        status=200
    )

@api_view(["POST"])
def change_admin_password(request):
    username = request.data.get("username")
    current_password = request.data.get("current_password")
    new_password = request.data.get("new_password")
    confirm_password = request.data.get("confirm_password")

    if new_password != confirm_password:
        return Response(
            {
                "success": False,
                "message": "New password and confirm password do not match"
            },
            status=400
        )
    
    if len(new_password)<6:
        return Response(
            {
                'success':False,
                'message':'New password must be at least 6 Characters long'
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    

    try:
        user=User.objects.get(username=username,is_staff=True)
    except User.DoesNotExist:
       return Response(
           {
               "success": False,
               "message": "User not found"
           },
           status=404
       )

    if not user.check_password(current_password):
       return Response(
           {
               "success": False,
               "message": "Invalid current password"
           },
           status=401
       )
    user.set_password(new_password)
    user.save()

    return Response(
       {
           "success": True,
           "message": "Password Chnages Succesfully"
       },
       status=status.HTTP_200_OK
   )

@api_view(['POST'])
def user_signup(request):
    full_name=request.data.get('full_name')
    mobile=request.data.get('mobile')
    email=request.data.get('email')
    password=request.data.get('password')
    confirm_password=request.data.get('confirm_password')

    if password!=confirm_password:
        return Response(
            {
                'success':False,
                'message':'Both Password doesnt match'
            },
            status=400
        )
    
    if len(password)<6:
        return Response(
            {
                'success':False,
                'message':'Least 6 characters Required'
            },
            status=400
        )
    

    last_student=Student.objects.all().order_by('-id').first()
    if last_student and last_student.student_id.isdigit():
        new_id_int=int(last_student.student_id)+1
        
    else:
        new_id_int=101   

    student_id=str(new_id_int)

    if Student.objects.filter(email=email).exists():
        return Response(
            {
                'success':False,
                'message':'Email Already Exists'
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    
    hashed_password=make_password(password)

    student=Student.objects.create(
        student_id=student_id,
        full_name=full_name,
        mobile=mobile,
        email=email,
        password=hashed_password,
        is_active=True,

    )
    return Response(
        {
            'success':True,
            'message':'User registered successfully',
            'student_id':student.student_id,
            'full_name':student.full_name,
        },
        status=status.HTTP_201_CREATED
    )


@api_view(['POST'])
def user_login(request):
    login_id = request.data.get("login_id")
    password = request.data.get("password")

    try:
        if "@" in login_id:
            student = Student.objects.get(email=login_id)
        else:
            student=Student.objects.get(student_id=login_id)
    except Student.DoesNotExist:
        return Response(
            {
                "success": False,
                "message": "Invalid login credentials"
            },
            status=401
        )
    if not check_password(password, student.password):
        return Response(
            {
                "success": False,
                "message": "Invalid login credentials"
            },
            status=401
        )
    
    if not student.is_active:
        return Response(
            {
                "success": False,
                "message": "Your account is inactive. Please contact the administrator."
            },
            status=403
        )
    
    return Response(
        {
            "success": True,
            "message": "Login successful",
            "student_id": student.student_id,
            "full_name": student.full_name,
            'email': student.email
        },
        status=200
    )


@api_view(["GET"])
def user_stats(request):
    student_id=request.query_params.get("student_id")
    try:
        student=Student.objects.get(student_id=student_id)
    except Student.DoesNotExist:
        return Response(
            {
                'success':False,
                "message":"Student Not Found"
            },
            status=status.HTTP_404_NOT_FOUND
        )
    
    total_books=Book.objects.count()
    total_issued=IssuedBook.objects.filter(student=student).count()
    not_returned=IssuedBook.objects.filter(student=student,is_returned=False).count()


    stats = {
        'total_books':total_books,
        'total_issued':total_issued,
        'not_returned':not_returned
    }    

    return Response(
        {
            'success':True,
            'stats':stats

        },
        status=200
    )


@api_view(["GET"])
def user_list_books(request):
    books=Book.objects.select_related('author', 'category').prefetch_related('issued_records').all().order_by('title')
    serializer = BookListSerializer(books, many=True)
    return Response(
        serializer.data,
        status=status.HTTP_200_OK
    )


@api_view(['GET',"PUT"])
def user_profile(request):
    student_id=request.query_params.get('student_id') or request.data.get('student_id')
    try:
        student=Student.objects.get(student_id=student_id)
    except Student.DoesNotExist:
        return Response(
            {
                'success':False,
                'message':'student not found'
            },
            status=404
        )
    if request.method=="GET":
        serializer=StudentSerializer(student)
        return Response(serializer.data, status=200)
    elif request.method=='PUT':
        serializer=StudentSerializer(student,data=request.data , partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=200)
        return Response(serializer.errors,status=400)
    
@api_view(['post'])
def user_change_password(request):
    student_id=request.data.get('student_id')
    current_password=request.data.get('current_password')
    new_password=request.data.get('new_password')
    confirm_password=request.data.get('confirm_password')

    if new_password!=confirm_password:
        return Response(
            {
                'success':False,
                'message':'Both fields do not match'
            },
            status=400
        )
    if len(new_password)<6:
        return Response(
            {
                'success':False,
                'message':'Less then 6 Characters'
            },
            status=400
        )
    
    try:
        student=Student.objects.get(student_id=student_id)
    except Student.DoesNotExist:
        return Response(
            {
                'success':False,
                'message':"user does not exist"
            },
            status=404
        )
    
    if not check_password(current_password,student.password):
        return Response(
            {
                'success':False,
                'message':'Current password is incorrect'
            },
            status=401
        )
    hashed_new_password=make_password(new_password)
    student.password=hashed_new_password
    student.save()

    return Response(
        {
            'success':True,
            'message':'Password Changes succesfully'
        },
        status=200
    )
    

@api_view(["GET"])
def list_reg_students(request):
    student=Student.objects.all().order_by('id')
    serializer=StudentSerializer(student,many=True)
    return Response(
        serializer.data,
        status=200
    )    

@api_view(['POST'])
def block_students(request,id):
    student=get_object_or_404(Student,id=id)
    student.is_active=False
    student.save()

    return Response(
        {
            'success':True,
            'message':'Student has been blocked',
            'student':StudentSerializer(student).data
        },
        status=200
    )


@api_view(['POST'])
def activate_students(request,id):
    student=get_object_or_404(Student,id=id)
    student.is_active=True
    student.save()

    return Response(
        {
            'success':True,
            'message':StudentSerializer(student).data
        },
        status=200
    )

@api_view(["GET"])
def get_student_by_student_id(request):
    student_id=request.query_params.get('student_id') or request.data.get('student_id')
    try:
        student=Student.objects.get(student_id=student_id)
        serializer=StudentSerializer(student)
        return Response({'success':True, 'student':serializer.data},status=200)
    except Student.DoesNotExist:
        return Response (
            {
            'success':False,
            'message':'student not found'
            },
            status=404
        )




@api_view(["GET"])
def lookup_book_for_issue(request):
    query = request.query_params.get('q', '').strip()

    if not query:
        return Response(
            {'success': False, 'message': 'Search query required'},
            status=400
        )

    book = Book.objects.filter(
        Q(isbn__iexact=query) | Q(title__icontains=query)
    ).first()

    if not book:
        return Response(
            {'success': False, 'message': 'Book not found'},
            status=404
        )

    serializer = BookSerializer(book)  
    return Response(
        {'success': True, 'book': serializer.data},
        status=200
    )

@api_view(["POST"])
def issue_book(request):
    student_id=request.data.get('student_id')
    book_id=request.data.get('book_id')
    remark=request.data.get('remark','')

    try:
        student=Student.objects.get(id=student_id)
    except Student.DoesNotExist:
        return Response(
            {
                'success':False,
                'message':"student not found"
            },
            status=404
        )
    
    try:
        book=Book.objects.get(id=book_id)
    except Book.DoesNotExist:
        return Response(
            {
                'success':False,
                'message':'Book not found'
            },
            status=404
        )
    
    # issued_count=IssuedBook.objects.filter(book=book, is_returned=False).count()
    # available_quantity=book.quantity-issued_count

    if book.quantity<=0:
        return Response(
            {
                'success':False,
                'message':'no copies of book available currently'
            },
            status=400
        )
    
    issued_book=IssuedBook.objects.create(
        student=student,
        book=book,
        remark=remark,
        fine=0,
        is_returned=False,
    )

    book.quantity-=1
    book.is_issued=True
    book.save()

    return Response(
        {
            'success':True,
            'message':"issued successfully",
            'issued_book_id':issued_book.id
        },
        status=201
    )
    



@api_view(["GET"])
def list_issued_books(request):
    Issued_books=IssuedBook.objects.select_related('student','book').all().order_by('-id')
    serializer=IssuedBookSerializer(Issued_books,many=True)
    return Response(
        serializer.data,
        status=200
    )



@api_view(["GET"])
def get_issued_book_details(request,id):
    issue_book=get_object_or_404(IssuedBook,id=id)
    serializer=IssuedBookSerializer(issue_book)
    return Response(
        serializer.data,
        status=200
    )



@api_view(["POST"])
def return_book(request,id):
    issued_book=get_object_or_404(IssuedBook,id=id)
    if issued_book.is_returned:
        return Response(
            {
                'success':False,
                'message':'This book is already returned'
            },
            status=400
        )
    
    fine=request.data.get("fine",0)

    try:
        fine=int(fine)
    except(ValueError,TypeError):
        return Response(
            {
                'success':False,
                'message':'Invalid fine value'
            },
            status=400
        )
    issued_book.is_returned=True
    issued_book.fine=fine
    issued_book.return_at=timezone.now()
    issued_book.save()

    book=issued_book.book
    book.quantity+=1
    book.is_issued=book.issued_records.filter(is_returned=False).exists()
    book.save(update_fields=['quantity','is_issued'])

    return Response(
        {
            'success':True,
            'message':'Book returned succesfully'
        },
        status=200
    )


@api_view(["GET"])
def student_issue_history(request,student_id):
    student=get_object_or_404(Student,student_id=student_id)
    issued_books=(IssuedBook.objects
                # .filter(student__student_id=student_id)
                  .filter(student=student)
                  .select_related('student', 'book')
                  .order_by('-id'))
    issues_serializer=IssuedBookSerializer(issued_books,many=True)
    student_serializer=StudentSerializer(student)
    return Response({
       'student':student_serializer.data,
       'issues':issues_serializer.data
    },status=200
    )

# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from django.shortcuts import get_object_or_404

# @api_view(["GET"])
# def student_issue_history(request, student_id):

#     student = get_object_or_404(Student, student_id=student_id)

#     issued_books = (
#         IssuedBook.objects
#         .filter(student=student)
#         .select_related('student', 'book')
#         .order_by('-id')
#     )

#     issues_serializer = IssuedBookSerializer(issued_books, many=True)
#     student_serializer = StudentSerializer(student)

#     return Response({
#         "student": student_serializer.data,
#         "issues": issues_serializer.data
#     }, status=200)

    
@api_view(["GET"])
def admin_dashboard_stats(request):

    total_students = Student.objects.all().count()
    active_students = Student.objects.filter(is_active=True).count()
    blocked_students = Student.objects.filter(is_active=False).count()
    total_books = Book.objects.count()
    available_books = Book.objects.filter(quantity__gt=0).count()
    out_of_stock_books = Book.objects.filter(quantity__lte=0).count()
    total_categories = Category.objects.count()
    total_authors = Author.objects.count()
    total_issued = IssuedBook.objects.count()
    currently_issued = IssuedBook.objects.filter(is_returned=False).count()
    returned_count = IssuedBook.objects.filter(is_returned=True).count()

    data={
        'total_students':total_students,
        'active_students':active_students,
        'blocked_students':blocked_students,
        'total_books':total_books,
        'available_books':available_books,
        'out_of_stock_books':out_of_stock_books,
        'total_categories':total_categories,
        'total_authors':total_authors,
        'total_issued':total_issued,
        'currently_issued':currently_issued,
        'returned_books':returned_count
    }

    return Response(
         data,
         status=200
         )



@api_view(["GET"])
def user_issued_books(request):
    student_id=request.query_params.get('student_id')
    try:
        student=Student.objects.get(student_id=student_id)
    except Student.DoesNotExist:
        return Response(
            {
                'success':False,
                'message':"student not found"
            },
            status=404
        )
    
    issued_books=(IssuedBook.objects.filter(student=student)
                  .select_related('book','student')
                  .order_by('-id'))
    serializer=IssuedBookSerializer(issued_books,many=True)
    return Response(
                    serializer.data,
                    status=200
                    )
