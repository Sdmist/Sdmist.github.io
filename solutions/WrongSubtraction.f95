program WrongSubtraction
  implicit none
  integer :: n, k, i

  read *, n, k
  do i = 1, k
    if (n % 10 == 0) then 
      n = n/10
    else 
      n = n - 1
    end if 
  end do
  write(*, '(I0)') n
end program WrongSubtraction
