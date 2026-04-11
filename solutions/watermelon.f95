program watermelon
    implicit none
    integer :: w
    read *, w
    
    if (w > 2 .and. mod(w, 2) == 0) then
        write(*, '(A)') "YES"
    else 
        write(*, '(A)') "NO"
    end if
    
end program watermelon

