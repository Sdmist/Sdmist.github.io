program Elephant
    implicit none
    integer :: x

    read *, x
    if (mod(x, 5) == 0) then 
        write(*, '(I0)') x/5
    else
        write(*, '(I0)') x/5 + 1
    end if
    
end program Elephant
