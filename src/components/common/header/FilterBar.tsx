import { useEffect, useState } from "react";
import styled from "styled-components";
import { rowFlex } from "../../../styles/flexStyles";
import { useSearchParams } from "react-router-dom";
import { climateIcons } from "../../../constants/climateIcons";

const FilterBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get("filter");
  const [activeFilter, setActiveFilter] = useState<string | null>(
    initialFilter
  );

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (activeFilter) {
      newParams.set("filter", activeFilter);
    } else {
      newParams.delete("filter");
    }
    setSearchParams(newParams);
  }, [activeFilter]);

  return (
    <FilterContainer>
      {climateIcons.map(({ id, icon: Icon }) => {
        return (
          <IconWrapper
            key={id}
            $active={activeFilter === id}
            onClick={() => setActiveFilter(activeFilter === id ? null : id)}
          >
            <Icon />
          </IconWrapper>
        );
      })}
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  width: fit-content;
  height: 45px;
  gap: 8px;
  padding: 2px 6px;
  border-radius: 999px;
  ${rowFlex({ align: "center", justify: "center" })};

  background: rgba(0, 255, 255, 0.05);
  border: 1px solid rgba(0, 204, 255, 0.3);
  box-shadow: 0 0 10px rgba(20, 181, 255, 0.5);
  backdrop-filter: blur(6px);
`;

const IconWrapper = styled.div<{ $active?: boolean }>`
  width: 42px;
  height: 42px;
  padding: 6px;
  ${rowFlex({ align: "center", justify: "center" })};
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.gray[500]};

  svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export default FilterBar;
