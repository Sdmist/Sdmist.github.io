program NextRound
    implicit none
    integer :: i, n, k, ans = 0
    integer, allocatable :: a(:)
    
    read *, n, k
    allocate(a(n))
    read *, a
    do i = 1, n
        if (a(i) > 0 .and. a(i) >= a(k)) then
            ans = ans + 1
        end if
    end do
    write(*, '(I0)') ans
end program NextRound