import React, { useState, useEffect } from 'react';
import { Revenue, RevenueCriteria, RevenueSearchRequest, RevenueSearchResponse, PageRequestDTO, TransactionType, Contractor } from '../app/backend-types/model/models';

const BASE_PATH = 'http://localhost:8080'; // Assuming your backend is running on this port

const Przychody = () => {
    const [filters, setFilters] = useState<RevenueCriteria>({});
    const [revenues, setRevenues] = useState<Revenue[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(20);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [hasSearched, setHasSearched] = useState<boolean>(false);

    const fetchRevenues = async () => {
        const request: RevenueSearchRequest = {
            criteria: filters,
            pageRequestDTO: {
                page: currentPage,
                size: pageSize,
                sortBy: 'id', // Default sort
                direction: 'ASC' // Default direction
            }
        };

        try {
            const response = await fetch(`${BASE_PATH}/billings/revenues/pages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(request)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: RevenueSearchResponse = await response.json();

            if (data.pageDTO) {
                setRevenues(data.pageDTO.content || []);
                setTotalPages(data.pageDTO.totalPages || 0);
                setTotalElements(data.pageDTO.total || 0);
            }
        } catch (error) {
            console.error("Error fetching revenues:", error);
            setRevenues([]); // Clear revenues on error
            setTotalPages(0);
            setTotalElements(0);
        }
    };

    useEffect(() => {
        if (hasSearched) {
            fetchRevenues();
        }
    }, [currentPage, pageSize, hasSearched, filters]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : (value === '' ? undefined : value)
        }));
    };

    const handleSearch = () => {
        setCurrentPage(0);
        setHasSearched(true);
    };

    const handleAddRevenue = () => {
        alert('Funkcja "Dodaj Przychód" jeszcze nie zaimplementowana.');
    };

    const handleResetFilters = () => {
        setFilters({});
        setCurrentPage(0);
        setRevenues([]);
        setTotalPages(0);
        setTotalElements(0);
        setHasSearched(false);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(0);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Ekran Przychody</h2>

            <div style={{ display: 'flex', marginBottom: '30px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                <div style={{ flex: 3, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                    <div>
                        <label>Nazwa:</label>
                        <input
                            type="text"
                            name="filterByName"
                            value={filters.filterByName || ''}
                            onChange={handleFilterChange}
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                    </div>
                    <div>
                        <label>Opis:</label>
                        <input
                            type="text"
                            name="filterByDescription"
                            value={filters.filterByDescription || ''}
                            onChange={handleFilterChange}
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                    </div>
                    <div>
                        <label>Data Sprzedaży:</label>
                        <input
                            type="date"
                            name="filterBySaleDate"
                            value={filters.filterBySaleDate || ''}
                            onChange={handleFilterChange}
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                    </div>
                    <div>
                        <label>Cena Netto:</label>
                        <input
                            type="number"
                            name="filterByTotalNetPrice"
                            value={filters.filterByTotalNetPrice || ''}
                            onChange={handleFilterChange}
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                    </div>
                    <div>
                        <label>Cena Brutto:</label>
                        <input
                            type="number"
                            name="filterByTotalGrossPrice"
                            value={filters.filterByTotalGrossPrice || ''}
                            onChange={handleFilterChange}
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                    </div>
                    <div>
                        <label>ID Typu Transakcji:</label>
                        <input
                            type="number"
                            name="filterByTransactionTypeId"
                            value={filters.filterByTransactionTypeId || ''}
                            onChange={handleFilterChange}
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                    </div>
                    <div>
                        <label>ID Kontrahenta:</label>
                        <input
                            type="number"
                            name="filterByContractorId"
                            value={filters.filterByContractorId || ''}
                            onChange={handleFilterChange}
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '5px' }}>
                        <input
                            type="checkbox"
                            name="filterByDeleted"
                            checked={filters.filterByDeleted || false}
                            onChange={handleFilterChange}
                            style={{ marginRight: '5px' }}
                        />
                        <label>Usunięte</label>
                    </div>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px', paddingLeft: '20px' }}>
                    <button
                        onClick={handleSearch}
                        style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Szukaj
                    </button>
                    <button
                        onClick={handleResetFilters}
                        style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Resetuj filtry
                    </button>
                    <button
                        onClick={handleAddRevenue}
                        style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Dodaj Przychód
                    </button>
                </div>
            </div>

            <h3>Lista Przychodów ({totalElements} rekordów)</h3>
            <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label>Rekordów na stronę:</label>
                <select onChange={handlePageSizeChange} value={pageSize} style={{ padding: '8px', borderRadius: '5px' }}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Nazwa</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Data Sprzedaży</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Cena Netto</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Cena Brutto</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Typ Transakcji</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Kontrahent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {revenues.length > 0 ? (
                            revenues.map(revenue => (
                                <tr key={revenue.id}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{revenue.name}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{revenue.saleDate}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{revenue.totalNetPrice?.toFixed(2)}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{revenue.totalGrossPrice?.toFixed(2)}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{revenue.transactionType?.name ?? ''}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{revenue.contractor?.name ?? ''}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Brak danych do wyświetlenia. Wykonaj wyszukiwanie.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
                <span>Strona {currentPage + 1} z {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Poprzednia
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        style={{
                            padding: '8px 12px',
                            backgroundColor: currentPage === i ? '#0056b3' : '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                    style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Następna
                </button>
            </div>
        </div>
    );
};

export default Przychody;