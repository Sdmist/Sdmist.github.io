//This code is curretly wrong. It will be corrected soon.

program PetyaandStrings
  implicit none 
  character (len = 100) :: s1, s2
  integer :: i, n, diff, ans = 0
  
  read *, s1
  read *, s2 
  
  n = len_trim(s1)
  
  do i = 1, n
    diff = iachar(s1(i:i)) - iachar(s2(i:i))
    if (diff == 0 .or. abs(diff) == 32) then
      cycle
    else if (diff < 0) then
      ans = -1
      exit 
    else
      ans = 1
      exit 
    end if
  end do 
  
  write(*, '(I0)') ans
  
end program PetyaandStrings
  
  
  
  
