program WayTooLongWords
    implicit none
    integer :: i, n, l
    character(len = 100) :: word
    
    read *, n
    
    do i = 1, n
        read *, word
        l = len_trim(word) 
        if (l > 10) then
            write(*, '(A,I0,A)') word(1:1), l - 2, word(l:l)
        else
            write(*, '(A)') trim(word)
        end if
    end do
        
end program WayTooLongWords

