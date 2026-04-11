program Team
    implicit none
    integer :: i, n, ans = 0
    integer :: arr(3)
    
    read *, n
    do i = 1, n
        read *, arr
        if (count(arr == 1) > 1) then
            ans = ans + 1
        end if
    end do
    write(*, '(I0)') ans
    
end program Team
        