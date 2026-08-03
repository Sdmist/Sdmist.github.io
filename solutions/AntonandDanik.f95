program AntonandDanik
    implicit none
    integer :: n, a = 0, d, i
    character (len = 100) :: s
    
    read *, n 
    read *, s 
    
    do i = 1, n 
        if (s(i:i) == 'A') then
            a = a + 1
        end if
    end do
    
    d = n - a
    
    if (a > d) then
        write(*, '(A)') "Anton"
    else if (a < d) then
        write(*, '(A)') "Danik"
    else 
        write(*, '(A)') "Friendship"
    end if
    
end program AntonandDanik
