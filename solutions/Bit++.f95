program Team
    implicit none
    integer :: i, n, x = 0
    character(len = 3) :: s
    
    read *, n 
    do i = 1, n 
        read *, s
        if (s(2:2) == '+') then 
            x = x + 1
        else 
            x = x - 1
        end if
    end do
    write (*, '(I0)') x
    
end program Team
        