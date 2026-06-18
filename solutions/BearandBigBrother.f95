program BearandBigBrother
    implicit none
    integer :: a, b, itr

    read(*,*) a, b
    
    itr = 0
    do while (a <= b)
        a = 3*a
        b = 2*b
        itr = itr + 1
    end do

    write(*, '(I0)') itr
end program BearandBigBrother