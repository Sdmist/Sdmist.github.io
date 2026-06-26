program SoldierandBananas
    implicit none
    integer :: k, n, w, req, borrow
    
    read *, k, n, w
    
    req = ((w*(w+1))/2)*k
    borrow = max(0, req - n)
    write(*, '(I0)') borrow
    
end program SoldierandBananas